import Image from "next/image"

const Logo = () => {
  return (
    <div className="w-40">
      <Image src="/images/vadhanderikransen.svg" alt="Kransen Logo" width={200} height={200} className="w-full h-auto object-contain"/>      
    </div>


  )
}

export default Logo