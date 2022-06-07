import { useEffect } from "react";

export type PageProps = {
    title: string
}

export default function Page(props: React.PropsWithChildren<PageProps>) {
    const { title } = props;
    useEffect(() => {
        document.title = `${title} | Modilist`;
    });

    return (
        <>
            {props.children}
        </>
    )
}