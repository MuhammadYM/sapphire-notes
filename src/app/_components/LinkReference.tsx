"use client";

import { useState } from "react";

type ReferenceFormat = "markdown" | "apa" | "mla" | "harvard" | "chicago";

interface LinkMetadata {
  url: string;
  title: string;
  author?: string;
  date?: string;
}

export const LinkReference = () => {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [format, setFormat] = useState<ReferenceFormat>("markdown");
  const [generatedReference, setGeneratedReference] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generateReference = () => {
    const metadata: LinkMetadata = {
      url,
      title,
      author: author || undefined,
      date: date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    let reference = "";

    switch (format) {
      case "markdown":
        reference = `[${metadata.title}](${metadata.url})`;
        break;
      case "apa":
        reference = `${metadata.author ? `${metadata.author}. ` : ""}(${new Date(metadata.date ?? "").getFullYear() ?? "n.d."}). ${metadata.title}. Retrieved from ${metadata.url}`;
        break;
      case "mla":
        reference = `${metadata.author ? `${metadata.author}. ` : ""}"${metadata.title}." ${metadata.date ? `${metadata.date}. ` : ""}${metadata.url}`;
        break;
      case "harvard":
        reference = `${metadata.author ? `${metadata.author} ` : ""}(${new Date(metadata.date ?? "").getFullYear() ?? "n.d."}) ${metadata.title}. Available at: ${metadata.url} (Accessed: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })})`;
        break;
      case "chicago":
        reference = `${metadata.author ? `${metadata.author}. ` : ""}"${metadata.title}." Accessed ${metadata.date ?? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. ${metadata.url}.`;
        break;
    }

    setGeneratedReference(reference);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            type="url"
            placeholder="URL"
            className="w-full bg-base-200 text-sm placeholder:text-base-content/40 focus:outline-none px-3 py-2.5 rounded-lg transition-colors"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full bg-base-200 text-sm placeholder:text-base-content/40 focus:outline-none px-3 py-2.5 rounded-lg transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Author (optional)"
            className="w-full bg-base-200 text-sm placeholder:text-base-content/40 focus:outline-none px-3 py-2.5 rounded-lg transition-colors"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <input
            type="date"
            className="w-full bg-base-200 text-sm text-base-content/70 focus:outline-none px-3 py-2.5 rounded-lg transition-colors"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full bg-base-200 text-sm text-base-content focus:outline-none px-3 py-2.5 rounded-lg transition-colors cursor-pointer"
            value={format}
            onChange={(e) => setFormat(e.target.value as ReferenceFormat)}
          >
            <option value="markdown">Markdown</option>
            <option value="apa">APA</option>
            <option value="mla">MLA</option>
            <option value="harvard">Harvard</option>
            <option value="chicago">Chicago</option>
          </select>
        </div>

        <button
          onClick={generateReference}
          className="w-full px-4 py-2.5 bg-base-content text-base-100 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-sm font-light"
          disabled={!url.trim() || !title.trim()}
        >
          Generate
        </button>
      </div>

      {generatedReference && (
        <div className="space-y-3 pt-2">
          <div className="border-t border-base-content/10 pt-4"></div>
          <div className="bg-base-200/50 p-4 rounded-lg border border-base-content/5">
            <p className="text-xs leading-relaxed break-words text-base-content/80">{generatedReference}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full px-4 py-2.5 border border-base-content/20 text-base-content rounded-lg hover:bg-base-200 transition-colors text-sm font-light"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkReference;
