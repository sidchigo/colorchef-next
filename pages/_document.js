import Document, { Html, Head, Main, NextScript } from "next/document";

class ColorDoc extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@500;800&family=Poppins:wght@600&display=swap&family=Josefin+Sans:wght@700"
						rel="stylesheet"
					/>
					<link rel="icon" href="favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7992174123056607"
						crossOrigin="anonymous"
					></script>
					<script
						async
						data-name="BMC-Widget"
						data-cfasync="false"
						src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
						data-id="colorchef"
						data-description="Support me on Buy me a coffee!"
						data-message="Hope you like our recipes. Chef would love your tip!"
						data-color="#5F7FFF"
						data-position="Right"
						data-x_margin="18"
						data-y_margin="18"
					></script>
				</body>
			</Html>
		);
	}
}

export default ColorDoc;
