const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="text-accent text-center font-bold">
      {error === "NEXT_REDIRECT" ? "" : error}
    </div>
  )
}

export default ErrorMessage