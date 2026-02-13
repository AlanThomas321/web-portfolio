import { useState } from "react";
import type React from "react";
import "./Terminal.css";

type CommandKey =
  | "help"
  | "cmd"
  | "about"
  | "date"
  | "projects"
  | "resume"
  | "contact"
  | "shutdown";

type CommandValue = string | (() => string);

const commands: Record<CommandKey, CommandValue> = {
  help: `Available commands:
- help: Show this help menu
- clear: Clear the screen
- about: Who I am
- date: Show current date/time
- echo [text]: Print text
- projects: Show featured projects
- resume: Open resume in new tab
- contact: Show contact links
- shutdown: Close all apps
- cmd: Alias for help`,

  cmd: `Available commands:
- help
- clear
- about
- date
- echo [text]
- projects
- resume
- contact
- shutdown`,

  about: "I am Alan Thomas, a full stack developer with 1.5 years of experience.",
  date: () => new Date().toString(),
  projects: `GitHub Projects:
- Portfolio: https://github.com/AlanThomas321/Terminal_theme_Portfolio
- Budget Tracker: https://github.com/AlanThomas321/Budget-Tracker-AI`,
  resume: "Opening resume in a new tab...",
  contact: `Contact Me:
- Email: alanthomas2999@gmail.com
- GitHub: https://github.com/AlanThomas321
- LinkedIn: https://www.linkedin.com/in/alan-thomas-dev`,
  shutdown: "System shutting down... (Pretend mode)",
};

export default function Terminal() {
  const [lines, setLines] = useState<string[]>(["Type `cmd` or `help` to see commands"]);
  const [input, setInput] = useState("");

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const raw = input;
    const command = raw.trim();

    if (!command) return;

    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (command.toLowerCase().startsWith("echo ")) {
      const echoed = command.slice(5);
      setLines((prev) => [...prev, `> ${command}`, echoed]);
      setInput("");
      return;
    }

    const key = command.toLowerCase();

    if (key in commands) {
      const typedKey = key as CommandKey;
      const result = commands[typedKey];
      const output = typeof result === "function" ? result() : result;

      if (typedKey === "resume") {
        window.open("/Alan Thomas_CV.pdf", "_blank");
      }

      setLines((prev) => [...prev, `> ${command}`, output]);
      setInput("");
      return;
    }

    setLines((prev) => [...prev, `> ${command}`, `Command not found: ${command}`]);
    setInput("");
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {lines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      <div className="terminal-input">
        <span>&gt; </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
}
