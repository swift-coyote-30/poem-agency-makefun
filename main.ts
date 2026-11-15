// Poem Agency for make.fun - by swift-coyote-30
// A simple agent that creates poems on any topic.

export type PoemStyle = "romantic" | "funny" | "sad" | "inspirational" | "haiku";

export interface PoemRequest {
  topic: string;
  style?: PoemStyle;
  author?: string;
}

export interface Poem {
  title: string;
  topic: string;
  style: PoemStyle;
  lines: string[];
  text: string;
  author: string;
}

const templates: Record<PoemStyle, string[]> = {
  romantic: [
    "In the quiet of {topic}, my heart finds its home,",
    "Every whisper of {topic} calls me not to roam,",
    "Your light is the dawn that softens the night,",
    "With you, every moment feels perfectly right.",
  ],
  funny: [
    "I tried to write of {topic}, but my pen ran away,",
    "It danced with a chicken and forgot what to say,",
    "Now {topic} is laughing, and so am I too,",
    "This poem is silly, but it's made just for you!",
  ],
  sad: [
    "The rain remembers {topic} in a soft, fading song,",
    "I held it too tightly, and now it is gone,",
    "Yet in every shadow, a memory stays,",
    "Of {topic} and all of our beautiful days.",
  ],
  inspirational: [
    "Rise up for {topic}, let your courage take flight,",
    "You are stronger than darkness, you carry the light,",
    "Each step is a story, each fall makes you grow,",
    "Go chase {topic} — the world needs your glow.",
  ],
  haiku: [
    "{topic} in soft wind,",
    "Quiet dreams begin to bloom,",
    "Morning finds its peace.",
  ],
};

export function generatePoem(req: PoemRequest): Poem {
  const style = req.style || "romantic";
  const topic = req.topic.trim() || "hope";
  const lines = templates[style].map((line) =>
    line.replaceAll("{topic}", topic)
  );
  return {
    title: `A Poem About ${topic}`,
    topic,
    style,
    lines,
    text: lines.join("\n"),
    author: req.author || "Poem Agency",
  };
}

// Main entry for make.fun agent
export async function main(input: PoemRequest): Promise<Poem> {
  return generatePoem(input);
}

// Example: run with `deno run main.ts`
if (import.meta.main) {
  const poem = generatePoem({ topic: "the moon", style: "romantic" });
  console.log(poem.title);
  console.log(poem.text);
}