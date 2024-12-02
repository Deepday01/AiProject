import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

const app = express();
const PORT = 5000;

app.use(cors()); // 모든 요청에 대해 CORS 허용

app.get('/directions', async (req, res) => {
  const { start, goal, option } = req.query;

  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}&option=${option}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.VITE_NAVER_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.VITE_NAVER_CLIENT_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching directions:', error.message);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
