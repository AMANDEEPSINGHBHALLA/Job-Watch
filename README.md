## Job Watch: An AI-Powered Job Search Platform

**Job Watch** is a comprehensive web application built to streamline the job search process for tech professionals. It goes beyond traditional job boards by offering a potent combination of extensive job listings, insightful analytics, and personalized AI-powered recommendations.

**Demo:** https://jobwatch.onrender.com/

## Features

* **Aggregated Job Listings:** Job Watch gathers job listings from various prominent job sites including LinkedIn, providing a wide range of opportunities in one place.
* **Interactive Data Visualizations:** Understand the job market dynamics through interactive charts showcasing:
    * **Top Job Locations:** Identify geographical hotspots for specific roles and industries.
    * **Thriving Industries:** Discover industries witnessing significant growth and hiring activity.
    * **Active Hiring Companies:** View companies actively seeking new talent.
    * **Trending Job Roles:** See which job profiles are currently in high demand.
* **AI-Powered Job Recommendations:** Upload your resume and our AI engine will analyze your skills and experience to generate tailored job recommendations, guiding you towards roles that best match your qualifications.
* **Company Insights:** Access detailed information about each company, including ratings, average salaries, founded year, employee count, headquarters location, and more, empowering you to make informed decisions.
* **Easy-to-Use Interface:** Our user-friendly interface ensures a smooth and efficient job search experience.

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript, Bootstrap, EJS (Embedded JavaScript)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **AI Engine:** Google Gemini Pro Vision Model (via Google Generative AI API)
* **Data Visualization:** MongoDB Charts

## Installation

1. Clone the repository: 
   ```bash
   git clone https://github.com/your-username/Job-Watch.git 
   ```
2. Navigate to the project directory: 
   ```bash
   cd Job-Watch
   ```
3. Install dependencies: 
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string and Google API Key as follows:

   ```
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_API_KEY=your_google_api_key
   ```

5. Start the development server: 
   ```bash
   nodemon index.js 
   ```

## Usage

1. Open your web browser and visit `http://localhost:5000` (or the specified port in your setup).
2. Browse through the available job listings, explore the data visualizations, and upload your resume for personalized AI recommendations.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to help improve Job Watch.

## License

This project is licensed under the ISC License.

## Contact

For any questions or inquiries, please reach out to us at contact.jobwatch@gmail.com. 
