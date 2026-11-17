/** Perguntas frequentes em acordeão nativo (<details>), com linhas de quadra. */
export function Faq({ itens }: { itens: { p: string; r: string }[] }) {
  return (
    <div className="faq">
      {itens.map((item) => (
        <details key={item.p}>
          <summary>
            {item.p}
            <i aria-hidden="true" />
          </summary>
          <p>{item.r}</p>
        </details>
      ))}
    </div>
  );
}
