'use client';

export default function Toolbar({func}) {
    return (
        <form className="w-full flex p-6 justify-center items-center">
            <input type="text" name="search" className={`pl-5 border-b-2 border-b-slate-400 bg-transparent pb-1 lg:w-1/4 w-full`} placeholder="Enter Place..." onSubmit={(e) => {
                func(e.target.value);
            }}/>
        </form>
    )
}