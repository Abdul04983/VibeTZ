import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/tabs/home" />;
}

const challengeRoutes = require('./routes/challengeRoutes');

app.use('/api/challenges', challengeRoutes);
