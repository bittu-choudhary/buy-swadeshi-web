/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Find Swadeshi`,
    description: `One stop destination to know about Indian brands and Indian products in your favourite category`,
    author: `Bittu Choudhary`,
    titleTemplate: "%s | Vocal for Local",
    siteUrl: "https://www.buyswadeshi.store",
    ogImageUrl: "https://www.buyswadeshi.store/icon-512.png",
    ogTitle: "Find Swadeshi | Vocal for Local",
    sitemap: 'https://www.buyswadeshi.store/sitemap.xml',
  },
  plugins: [
    "gatsby-plugin-sitemap",
    'gatsby-plugin-robots-txt',
    {      
      resolve: "gatsby-plugin-firebase",  
       options: {      
        features: {     
         auth: false,       
         database: false,  
         firestore: false,
         storage: false,    
         messaging: false, 
         functions: false,  
         performance: false, 
         analytics:true,    
        }, 
        credentials: {  
         apiKey: process.env.API_KEY, 
         authDomain: process.env.AUTH_DOMAIN,        
         databaseURL: process.env.DATABASE_URL,          
         projectId: process.env.PROJECT_ID,           
         storageBucket: process.env.STORAGE_BUCKET, 
         messagingSenderId:  process.env.MESSAGING_SENDER_ID,           
         appId: process.env.APP_ID,   
         measurementId: process.env.MEASUREMENT_ID, 
       }   
      },
     },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Find Swadeshi : Vocal for Local`,
        short_name: `Find Swadeshi`,
        description: `One stop destination to know about Indian brands and products in your favourite category`,
        start_url: `/`,
        background_color: `#ff9933`,
        theme_color: `#ff9933`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: "src/images/icon-192.png",
        start_url: "/?source=pwa",
        display: `standalone`,
        shortcuts: [
          {
            name: "Find Indian brands",
            short_name: "Today",
            description: "Search Indian brands in your favourite category",
            url: "/source=pwa",
            icons: [{ src: "src/images/icon-192.png", sizes: "192x192" }]
          }
        ], // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'Noto Sans JP',
            variable: true,
            weights: ['400, 700']
          }
        ]
      }
    }
  ],
}
