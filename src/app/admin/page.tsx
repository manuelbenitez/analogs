"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Upload } from "lucide-react";

const IMAGE_BASE = "https://img.mbdev.to";

const ALBUMS = [
  { path: "japan", name: "Japan" },
  { path: "new-zealand", name: "New Zealand" },
  { path: "austria", name: "Austria" },
  { path: "argentina", name: "Argentina" },
  { path: "france", name: "France" },
  { path: "espana", name: "España" },
  { path: "andorra", name: "Andorra" },
  { path: "indonesia", name: "Indonesia" },
  { path: "random", name: "Random" },
];

function SortableImage({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (key: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const filename = id.split("/").pop() ?? id;

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <div
        className="flex flex-1 cursor-grab items-center gap-2 rounded border border-white/10 bg-white/5 p-2 touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} className="flex-shrink-0 text-white/30" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/_next/image?url=${encodeURIComponent(`${IMAGE_BASE}/${id}`)}&w=96&q=75`}
          alt={filename}
          className="h-[50px] w-[50px] flex-shrink-0 rounded object-cover"
        />
        <span className="flex-1 truncate text-sm text-white/70">{filename}</span>
      </div>

      <div className="h-8 w-px bg-white/10" />

      <button
        onClick={() => {
          if (confirm(`Delete ${filename}?`)) onDelete(id);
        }}
        className="cursor-pointer rounded border border-red-400/20 bg-red-400/10 p-2 text-red-400/60 transition-colors hover:border-red-400/40 hover:bg-red-400/20 hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(ALBUMS[0]!.path);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const fetchImages = useCallback(async (album: string) => {
    setLoading(true);
    setMessage("");
    const res = await fetch(`${IMAGE_BASE}/api/list/${album}`);
    if (res.ok) {
      const keys = (await res.json()) as string[];
      setImages(keys.filter((k) => !k.endsWith("/")));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      void fetchImages(selectedAlbum);
    }
  }, [selectedAlbum, authenticated, fetchImages]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.indexOf(active.id as string);
      const newIndex = prev.indexOf(over.id as string);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await fetch(`${IMAGE_BASE}/api/order/${selectedAlbum}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify(images),
    });

    if (res.ok) {
      setMessage("Order saved!");
    } else if (res.status === 401) {
      setMessage("Wrong password.");
    } else {
      setMessage("Failed to save.");
    }

    setSaving(false);
  };

  const handleUpload = async (files: FileList) => {
    setMessage("Uploading...");
    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("file", file);
    }

    const res = await fetch(`${IMAGE_BASE}/api/upload/${selectedAlbum}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${password}` },
      body: formData,
    });

    if (res.ok) {
      const data = (await res.json()) as { uploaded: string[] };
      setImages((prev) => [...prev, ...data.uploaded]);
      setMessage(`${data.uploaded.length} image(s) uploaded.`);
    } else if (res.status === 401) {
      setMessage("Wrong password.");
    } else {
      setMessage("Upload failed.");
    }
  };

  const handleDelete = async (key: string) => {
    const res = await fetch(
      `${IMAGE_BASE}/api/image/${encodeURIComponent(key)}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      },
    );

    if (res.ok) {
      setImages((prev) => prev.filter((k) => k !== key));
      setMessage("Image deleted.");
    } else if (res.status === 401) {
      setMessage("Wrong password.");
    } else {
      setMessage("Failed to delete.");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-4 rounded border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && password) setAuthenticated(true);
            }}
            className="rounded border border-white/20 bg-black px-4 py-2 text-white outline-none focus:border-white/50"
          />
          <button
            onClick={() => password && setAuthenticated(true)}
            className="cursor-pointer rounded bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-20 pb-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="cursor-pointer rounded border border-white/20 bg-black px-4 py-2 text-white outline-none"
          >
            {ALBUMS.map((a) => (
              <option key={a.path} value={a.path}>
                {a.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            disabled={saving}
            className="cursor-pointer rounded bg-accent/30 px-4 py-2 transition-colors hover:bg-accent/50 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Order"}
          </button>

          <label className="flex cursor-pointer items-center gap-1 rounded bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
            <Upload size={16} />
            <span>Upload</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) void handleUpload(e.target.files);
                e.target.value = "";
              }}
            />
          </label>

          {message && (
            <span className="text-sm text-white/60">{message}</span>
          )}
        </div>

        {loading ? (
          <p className="text-white/50">Loading...</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="flex flex-col gap-1">
                {images.map((key) => (
                  <SortableImage
                    key={key}
                    id={key}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
