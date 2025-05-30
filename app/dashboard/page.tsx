export default async function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Why I Built This</h2>
        <p className="text-gray-700 mt-2">
          I created this Pomodoro app as a starter project to learn and explore
          <span className="font-medium"> Next.js</span>, focusing on building full-stack features, managing UI state, and integrating authentication and timers. It gave me hands-on experience with modern web development patterns.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Start, pause, and reset Pomodoro timers</li>
          <li>Customizable work and break durations</li>
          <li>Session tracking and daily goal visualization</li>
          <li>Simple authentication and protected routes</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </section>
    </main>
  );
}
