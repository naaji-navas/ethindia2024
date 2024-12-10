# OnChain Sentinel

## Overview


OnchainSentinel is the first autonomous, onchain agent that discovers and rewards creators driving attention to Base. It automatically tracks social engagement, creates onchain leaderboards, and distributes rewards. Built using Next.js, React, and Firebase, it leverages the Coinbase Developer Platform for blockchain interactions.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Firebase**: Used for authentication and real-time database.
- **Coinbase Onchainkit**: For blockchain interactions.
- **Tailwind CSS**: A utility-first CSS framework for styling.



## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/naaji-navas/ethindia2024.git
   cd ethindia2024/agent-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Ensure you have a Firebase project set up.
   - Enable Realtime Database and obtain your service account credentials.
   - Place your `firebaseconfig.json` in the root directory.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Start the production server**:
   ```bash
   npm start
   ```

## Configuration

- **Firebase**: Ensure your `firebaseconfig.json` is correctly configured with your Firebase project credentials.
- **Twitter API**: Store your Twitter API Bearer Token in a `config.json` file.

## Usage

- **Dashboard**: Access the dashboard to view wallet information and leaderboard.
- **Rewards Mode**: Use the rewards mode to distribute rewards to top Twitter users based on engagement.

## Troubleshooting

- **Module Not Found Errors**: Ensure all dependencies are installed and correctly imported.
- **Firebase Initialization Errors**: Verify your Firebase configuration and service account credentials.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact najidnavas2000@gmail.com 
