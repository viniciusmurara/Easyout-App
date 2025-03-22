
interface UserProps {
    name: string,
    image: any
}

export default function UserQueue({ name, image }: UserProps) {
    return (
        <div className="flex py-6 rounded-xl border border-zinc-500">
            <div className="px-4">
                {image}
            </div>
            <h1>{name}</h1>
        </div>
    )
}