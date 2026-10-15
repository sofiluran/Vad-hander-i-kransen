import Image from "next/image"

const Logo = () => {
  return (
    <div className="w-40">
      <Image src="/images/vadhanderikransen.svg" alt="Kransen Logo" width={150} height={150} className="w-full h-auto object-contain"/>      
    </div>


  )
}

export default Logo