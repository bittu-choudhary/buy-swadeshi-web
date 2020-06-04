/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
  },
  plugins: [
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
         apiKey:'AIzaSyDJqesu1KoTaHC7PR_A7mw7OY1GFGYgAOA', 
         authDomain:'buy-swadeshi.firebaseapp.com',        
         databaseURL:'https://buy-swadeshi.firebaseio.com',          
         projectId:'buy-swadeshi',           
         storageBucket:'buy-swadeshi.appspot.com', 
         messagingSenderId:'317395791078',           
         appId:'1:317395791078:web:e7cf672acd3ee85171df27',   
         measurementId:'G-H9FKSGL6P1', 
       }   
      },
     },
     'gatsby-plugin-robots-txt',
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
