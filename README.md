# ai_chatbots
Ai based chatbot with a dashboard thats hosted in Amazon Amplify right now, the URL is: https://dev.d22t33og3k5tju.amplifyapp.com/. Its username, password protected for security reasons.

![Chat example](chatbot-in-action.png)

## app
- This is the ai chatbot component written in vite + React JS.

- Uses Openai API for providing the intelligence for the chatbot

- The chatbot has been supplied with the following context informations, 

<pre>

[
    {
      name: "Organic Apples",
      category: "Fresh Produce",
      price: 2.99,
      origin: "Germany"
    },
    {
      name: "Whole Grain Bread",
      category: "Bakery",
      price: 1.49,
      origin: "Local Bakery"
    },
    {
      name: "Free-Range Eggs",
      category: "Dairy",
      price: 3.99,
      origin: "Germany"
    },
    // Add more product details here
    {
      name: "Fairtrade Coffee",
      category: "Beverages",
      price: 4.99,
      origin: "Various"
    }
  ];

  </pre>

<pre> "You are a REWE customer assistence agent, only reply in German. Your task is to help the answer or process the customer" + 
  "queries based on the information provided to you." + 
  " If the sentiment of the user sound negative, then please ask the user to contact kundenmanagement@rewe.de " +
  " For the details of the products Rewe sells follow the details after delimeter ### " + reweProductsString

</pre> 

- **Note** : The chatbot has been given the following commands (via Prompt Engineering [Certification](https://www.deeplearning.ai/short-courses/) done )
    - Act as a Rewe Customer assistent
    - Reply in **German**
    - It has been supplied 4 product informations (mentioned above)
    - It does a out of box, **Sentiment** analysis and redirects to kundenmanagement@rewe.de if user sound **Negative**
- **Note** : For using the chatbot my personal OpenAI keys are being used Its not pushed as part of the repository for security reasons. For testing in local you need to set your own key in .env file under root folder ex. "/app"

### AWS Amplify

Amplify seem to be a perfect match for hosting the vite + React JS project. Needed to be public hosted for flexible demo purposes, also for learning purpose. We followed following simple steps

- configured amplify CLI by following docs
- inside root path /app used command ´Amplify init´. Everything else is default except the Source Directory Path, Distribution Directory Path is set to ´dist´ because thats how vite builds the project. 
- Authentication method: AWS Profile 
- after init is done successfully we need the following steps

<pre> amplify add hosting
✔ Select the plugin module to execute · Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Manual deployment
</pre>

- followed by ´amplify publish´. This will automatically create a URL for accessing the hosted app. 
- Amplify automatically creates S3 buckets for the static files etc. This costs money though Amplify is free.
- Alternate deployment method using Github [tutorial](https://www.youtube.com/watch?v=XD6eJalN1Tw), would be easy to enable CI.


[Getting started with Amplify](https://docs.amplify.aws/) 
[How to configure CLI](https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli)

