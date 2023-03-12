// import { ImageResponse } from "@vercel/og";

// export const config = {
//     runtime: "edge",
// };

// export default function handler(req, res) {
//     try {
//         const { searchParams } = new URL(req.url);
//         console.log("PARAMS: ", searchParams);
//         const hasColor = searchParams.has("color");
//         const color = hasColor
//             ? searchParams.get("color")?.slice(0, 100)
//             : "E9FAE3";

//         return new ImageResponse(
//             (
//                 <div
//                     style={{
//                         backgroundColor: `#${color}`,
//                         display: "flex",
//                         fontSize: 40,
//                         color: "black",
//                         width: "100%",
//                         height: "100%",
//                         textAlign: "center",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     <svg
//                         width="3409"
//                         height="905"
//                         viewBox="0 0 3409 905"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <rect width="3409" height="905" fill="white" />
//                         <rect
//                             x="77"
//                             y="88"
//                             width="3255"
//                             height="730"
//                             fill="url(#paint0_radial_1901_5594)"
//                             fillOpacity="0.91"
//                         />
//                         <rect
//                             x="77"
//                             y="88"
//                             width="3255"
//                             height="730"
//                             fill="url(#paint1_radial_1901_5594)"
//                         />
//                         <rect
//                             x="77"
//                             y="88"
//                             width="3255"
//                             height="730"
//                             fill="url(#paint2_radial_1901_5594)"
//                             fillOpacity="0.93"
//                         />
//                         <path
//                             d="M2175.24 336.749C2154.05 324.513 2130.01 318.071 2105.54 318.071C2081.06 318.071 2057.02 324.513 2035.83 336.749C2014.64 348.984 1997.04 366.583 1984.8 387.776C1972.57 408.97 1966.13 433.01 1966.13 457.482C1966.13 481.954 1972.57 505.994 1984.8 527.187C1997.04 548.38 2014.64 565.979 2035.83 578.215C2057.02 590.451 2081.06 596.893 2105.54 596.893C2130.01 596.893 2154.05 590.451 2175.24 578.215"
//                             stroke="black"
//                             strokeWidth="40"
//                             strokeLinecap="square"
//                         />
//                         <path
//                             d="M456.144 336.706C434.951 324.47 410.91 318.028 386.439 318.028C361.967 318.028 337.926 324.47 316.733 336.706C295.54 348.941 277.941 366.54 265.705 387.734C253.47 408.927 247.028 432.967 247.028 457.439C247.028 481.911 253.47 505.951 265.705 527.144C277.941 548.337 295.54 565.936 316.733 578.172C337.926 590.408 361.967 596.85 386.439 596.85C410.91 596.85 434.951 590.408 456.144 578.172"
//                             stroke="black"
//                             strokeWidth="40"
//                             strokeLinecap="square"
//                         />
//                         <circle
//                             cx="719.646"
//                             cy="458.243"
//                             r="142.786"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <circle
//                             cx="1402.66"
//                             cy="458.243"
//                             r="142.786"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <circle
//                             cx="1402.66"
//                             cy="458.243"
//                             r="142.786"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2343.6"
//                             y1="295.457"
//                             x2="2343.6"
//                             y2="619.89"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2528.97"
//                             y1="295.457"
//                             x2="2528.97"
//                             y2="619.89"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2530.78"
//                             y1="465.36"
//                             x2="2323.6"
//                             y2="465.36"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2864.03"
//                             y1="452.956"
//                             x2="2674.21"
//                             y2="452.956"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2864.03"
//                             y1="315.457"
//                             x2="2674.21"
//                             y2="315.457"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="2864.03"
//                             y1="594.355"
//                             x2="2674.21"
//                             y2="594.355"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="3026.62"
//                             y1="445.822"
//                             x2="3026.62"
//                             y2="619.89"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="3140.74"
//                             y1="465.822"
//                             x2="3006.62"
//                             y2="465.822"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="3213.8"
//                             y1="314.319"
//                             x2="3006.61"
//                             y2="314.319"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="1011.71"
//                             y1="295.457"
//                             x2="1011.71"
//                             y2="606.23"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="1129.46"
//                             y1="594.718"
//                             x2="991.715"
//                             y2="594.718"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <line
//                             x1="1723.8"
//                             y1="501.813"
//                             x2="1828.87"
//                             y2="606.887"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <path
//                             d="M1707.75 318.225C1851.98 318.225 1851.98 511.179 1707.75 511.179"
//                             stroke="black"
//                             strokeWidth="40"
//                         />
//                         <defs>
//                             <radialGradient
//                                 id="paint0_radial_1901_5594"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(798.114 -16.4759) rotate(27.1383) scale(2370.37 8832.83)"
//                             >
//                                 <stop offset="0.189789" stopColor="#B0C1FF" />
//                                 <stop offset="1" stopColor="#C9B0DA" />
//                             </radialGradient>
//                             <radialGradient
//                                 id="paint1_radial_1901_5594"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(77.0001 818) rotate(-16.3883) scale(2150.85 7759.27)"
//                             >
//                                 <stop stopColor="#9FFAFE" />
//                                 <stop offset="1" stopColor="#B0C1FF" />
//                             </radialGradient>
//                             <radialGradient
//                                 id="paint2_radial_1901_5594"
//                                 cx="0"
//                                 cy="0"
//                                 r="1"
//                                 gradientUnits="userSpaceOnUse"
//                                 gradientTransform="translate(3191.17 161.356) rotate(136.151) scale(1883.53 7492.35)"
//                             >
//                                 <stop offset="0.308364" stopColor="#FF9585" />
//                                 <stop
//                                     offset="0.887932"
//                                     stopColor="#B0C1FF"
//                                     stopOpacity="0.25"
//                                 />
//                             </radialGradient>
//                         </defs>
//                     </svg>
//                 </div>
//             ),
//             {
//                 width: 1200,
//                 height: 630,
//             }
//         );
//     } catch (err) {
//         console.log("API ERROR: ", err);
//         return new Response(`Failed to generate the image`, {
//             status: 500,
//         });
//     }
// }

import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge",
};

export default async function handler(req) {
    const { username } = req.query;
    console.log("REQ: ", username);
    if (!username) {
        return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
            width: 1200,
            height: 630,
        });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    fontSize: 60,
                    color: "black",
                    background: "#f6f6f6",
                    width: "100%",
                    height: "100%",
                    paddingTop: 50,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    width="256"
                    height="256"
                    src={`https://github.com/${username}.png`}
                    style={{
                        borderRadius: 128,
                    }}
                />
                <p>github.com/{username}</p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
