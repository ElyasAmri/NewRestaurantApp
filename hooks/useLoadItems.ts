import { useEffect, useState } from "react"
import { Item } from "../types";
import Constants from "expo-constants";

export default function useLoadItems(repeatRef: number) : [Item[], boolean, boolean] {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      try{
        // TODO: refer to env
        const response = await fetch(Constants.manifest.extra?.menu_fetch_url)
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        setItems(data);
      }
      catch (e) {
        console.warn(e)
        // TODO: Use cache
        setFailed(true);
      }
      finally {
        setIsLoading(false)
      }

      // setItems([
      //   {"id":0, "name": "item0", "imageUrl": "None", "price": 0.01, "limitCount": 20},
      //   {"id":1, "name": "item1", "imageUrl": "None", "price": 1.11, "limitCount": 20},
      //   {"id":2, "name": "item2", "imageUrl": "None", "price": 2.21, "limitCount": 20},
      //   {"id":3, "name": "item3", "imageUrl": "None", "price": 3.31, "limitCount": 5},
      //   {"id":4, "name": "item4", "imageUrl": "None", "price": 4.41, "limitCount": 5},
      //   {"id":5, "name": "item5", "imageUrl": "None", "price": 5.51, "limitCount": 5},
      //   {"id":6, "name": "item6", "imageUrl": "None", "price": 6.61, "limitCount": 2},
      //   {"id":7, "name": "item7", "imageUrl": "None", "price": 7.71, "limitCount": 2},
      //   {"id":8, "name": "item8", "imageUrl": "None", "price": 8.81, "limitCount": 2},
      //   {"id":9, "name": "item9", "imageUrl": "None", "price": 9.91, "limitCount": 2},
      //   {"id":10, "name": "item10", "imageUrl": "None", "price": 90.91, "limitCount": 2}
      // ]);
    })();
    }, [repeatRef])

  return [items, isLoading, failed];
}
