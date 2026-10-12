import Logo from "../Header/logo"

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card mt-20 text-text py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center text-center">
        <div className="w-50 sm:w-60 h-auto shrink-0 flex justify-center">
          <Logo />
        </div>
        <p className="text-text/80 max-w-md text-sm sm:text-base">
          Din lokala guide till konserter, loppisar, utställningar och händelser i Midsommarkransen.
        </p>

      </div>
    </footer>
  )
}

export default Footer