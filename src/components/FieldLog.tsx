type FieldLogEntry = {
  time: string
  message: string
}

type FieldLogProps = {
  entries: FieldLogEntry[]
}

export default function FieldLog({ entries }: FieldLogProps) {
  return (
    <section className="field-log">
      <h2 className="project-detail-section-title">Field log</h2>
      <div className="field-log__thread" role="list">
        {entries.map((entry) => (
          <article key={`${entry.time}-${entry.message}`} className="field-log__message" role="listitem">
            <time className="field-log__time">{entry.time}</time>
            <p>{entry.message}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
