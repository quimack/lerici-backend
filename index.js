import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-2043141217323799-041916-24f396a92d90b973b64df7ae573a496c-1201866",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successfully");
});

app.post("/create_preference", async (req, res) => {
  try {
    console.log(req.body);
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      //   back_urls: {
      //     success: "https://www.linkedin.com/in/macarenaquiven/",
      //     failure: "https://www.youtube.com/",
      //     pending: "https://www.instagram.com/",
      //   },
      //   auto_return: "approved",
    };

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: "manzana",
            quantity: 1,
            unit_price: 2,
            currency_id: "ARS",
          },
        ],
      },
    });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log("ERROR :(");
    res.status(400).json({
      error: "Error al crear la referencia",
    });
  }
});

app.listen(port, () => {
  console.log("Server running ok");
});
