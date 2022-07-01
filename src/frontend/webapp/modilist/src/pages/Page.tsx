import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export type PageProps = {
    title: string
}

export default function Page(props: React.PropsWithChildren<PageProps>) {
    const { t } = useTranslation();
    const { title } = props;
    useEffect(() => {
        document.title = `${t(title)} | Modilist`;
    });

    return (
        <>
            {props.children}
        </>
    )
}