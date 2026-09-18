export default function ApiWarning({ message = 'Modo offline / API desconectada — exibindo dados locais de demonstração.' }) {
  return (
    <section className="api-warning" role="status" aria-live="polite">
      <strong>AVISO</strong>
      <span>{message}</span>
    </section>
  )
}
