import { useRouter } from "next/router";

const Meta = ({ title, colorcode, image, description }) => {
    const router = useRouter();
    console.log("ROUTER: ", router, colorcode);
    if (router) {
        const { color } = router?.query;
        console.log("CCODE: ", color.slice(0, 6));
    }

    const staging = "colorchef-git-enhancements-sidchigo";
    const prod = "colorchef";
    return (
        <>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="google" content="nositelinkssearchbox" />
            <meta
                name="google-site-verification"
                content="3e0geQdLz85Lt7QW4uuffb3R-dx6IFCf8BbFJ9oLP6g"
            />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta
                property="og:url"
                content={`https://${staging}.app/api/og?color=${colorcode}`}
            />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:image"
                content={`https://${staging}.app/api/og?color=${colorcode}`}
            />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:url"
                content={`https://${staging}.app/api/og?color=${colorcode}`}
            />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta
                property="twitter:image"
                content={`https://${staging}.app/api/og?color=${colorcode}`}
            />
        </>
    );
};

export default Meta;
