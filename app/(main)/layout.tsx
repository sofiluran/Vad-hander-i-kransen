import Header from "@/components/Header"
import AccountLinks from "@/components/Header/accountLinks"
import Navigation from "@/components/Navbar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Navigation accountlinks={<AccountLinks />} />
      </div>
    </div>
  )
}

export default MainLayout