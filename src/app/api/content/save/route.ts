import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const { type, slug, content } = await request.json();

    if (!type || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (type !== "doc" && type !== "blog") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 },
      );
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Invalid slug format. Use only lowercase letters, numbers, and hyphens",
        },
        { status: 400 },
      );
    }

    // Determine the directory path
    const contentDir = join(
      process.cwd(),
      "content",
      type === "doc" ? "docs" : "blog",
    );

    // Ensure directory exists
    if (!existsSync(contentDir)) {
      await mkdir(contentDir, { recursive: true });
    }

    // Create file path
    const filePath = join(contentDir, `${slug}.mdx`);

    // Check if file already exists
    if (existsSync(filePath)) {
      return NextResponse.json(
        {
          error:
            "A file with this slug already exists. Please choose a different title.",
        },
        { status: 409 },
      );
    }

    // Write the file
    await writeFile(filePath, content, "utf-8");

    return NextResponse.json({
      success: true,
      path: filePath,
      url: `/${type === "doc" ? "docs" : "blog"}/${slug}`,
    });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 },
    );
  }
}
