'use client';
export default function Toolbar({func}) {
    return (
        <form className="w-full flex p-6 lg:justify-start justify-center">
            <input type="text" name="search" className="bg-stone-800 p-2 rounded-full lg:w-1/4 w-full" placeholder="Enter Place.." onSubmit={(e) => {
                func(e.target.value);
            }}/>
        </form>
    )
}