interface inputProps{
    refernce? : any ,
    placeholder : string
}

export function Input({ refernce , placeholder }: inputProps) {
    return <div className="border rounded-sm h-8">
        <input type="text" placeholder={placeholder} ref = {refernce} className="w-full h-full pl-3 text-black"/>
    </div>
}