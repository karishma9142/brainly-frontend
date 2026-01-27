export function Input({ onchange, placeholder }: { onchange: () => void , placeholder : string}) {
    return <div className="border rounded-sm h-8">
        <input type="text" placeholder={placeholder} onChange={onchange} className="w-full" class="h-full w-full pl-3 text-black"/>
    </div>
}