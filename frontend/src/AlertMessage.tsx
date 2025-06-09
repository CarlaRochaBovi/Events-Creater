interface AlertMessageProps {
  alertMessage: string | null;
}

export function AlertMessage({ alertMessage }: AlertMessageProps) {
  return (
    <div className={`alert ${alertMessage ? 'show' : ''}`}>
      <p>{alertMessage}</p>
    </div>
  );
}
