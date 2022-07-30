import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export type PageProps = {
    title: string
}

export default function Page(props: React.PropsWithChildren<PageProps>) {
    const { t } = useTranslation();
    const { title } = props;

    return (
        <>
            <Helmet>
                <title>{`${t(title)} | Modilist`}</title>
            </Helmet>
            {props.children}
        </>
    )
}