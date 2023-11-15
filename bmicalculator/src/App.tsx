import { useState } from 'react'
import { iCustomInputProps } from './model/iCustomInputProps'


const CustomInput = ({header, value, width, onchange, type}: iCustomInputProps) => {
  return (
    <div className={`h-20 ${width} flex flex-col items-center gap-y-4`}>
      <label htmlFor={header} className='font-bold text-zinc-500'>{header}</label>
      <input type={type} id={header} value={value}
        className='w-[90%] h-10 px-2 text-lg font-bold text-center border-b-2 outline-none text-zinc-500 focus:outline-none focus:border-zinc-500 border-zinc-300'
        onChange={(e) => onchange(e.currentTarget.value)}/>
    </div>
  )
}

const App = () => {
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleSetAge = (value: string) => {
    setAge(Number(value))
  }

  const handleSetHeight = (value: string) => {
    setHeight(Number(value))
  }

  const handleSetWeight = (value: string) => {
    setWeight(Number(value))
  }

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-white">
      <div className='w-full h-[10%] bg-zinc-200 flex items-center justify-between shadow-md shadow-zinc-300'>
        <p className='ml-4 text-2xl font-bold text-zinc-600'>BMI Calculator</p>

        <button className='flex flex-col items-center p-2 m-2 gap-y-1'>
          <div className='w-1 h-1 bg-black rounded-full'></div>
          <div className='w-1 h-1 bg-black rounded-full'></div>
          <div className='w-1 h-1 bg-black rounded-full'></div>
        </button>
      </div>

      <div className="w-[90%] h-[90%] mt-[5%] relative flex gap-2">
        <CustomInput type="number" header="Age"  value={age} 
          onchange={handleSetAge} width="w-20"/>

        <CustomInput type='number' header='Height'  value={height} 
          onchange={handleSetHeight} width='w-24' />
      </div>
    </div>
  )
}

export default App
