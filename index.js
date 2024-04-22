import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
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
    const orderData = req.body;
    let items = [];

    for (const item of orderData) {
      const title = item.name;
      const quantity = Number(item.quantity);
      const unitPrice = Number(item.price);
   
      if (
        !title ||
        !quantity ||
        isNaN(quantity) ||
        !unitPrice ||
        isNaN(unitPrice)
      ) {
        return res.status(400).send("Invalid request body");
      }

      items.push({
        title,
        quantity,
        unit_price: unitPrice,
        currency_id: "ARS"
      })
      console.log(item);
    }


    const body = {
      items
      //   back_urls: {
      //     success: "https://www.linkedin.com/in/macarenaquiven/",
      //     failure: "https://www.youtube.com/",
      //     pending: "https://www.instagram.com/",
      //   },
      //   auto_return: "approved",
    };

    const preference = new Preference(client);

    const result = await preference.create({
      body
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
