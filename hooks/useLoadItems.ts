import {useEffect, useReducer, useState} from "react"
import { Item } from "../types";
import Parse from "parse/react-native"

export default function useLoadItems() : [Item[], boolean, boolean, number, () => void] {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ref, repeat] = useReducer(x => x + 1, 0)

  useEffect(() => {
    (async () => {
      try{
        const query = new Parse.Query("MenuItem")
        const result = await query.find();
        const items : Item[] = result.map((e) =>
              ({
                id: e.id,
                name: e.get('name'),
                imageUrl: e.get('image'),
                price: e.get('price'),
                limitCount: e.get('limitCount')
              }))
        setItems(items);
      }
      catch (e) {
        console.warn("Fetching from server failed, falling back to cache", e)
        // TODO: Use cache
        setItems([
          {"id":'0', "name": "burger", "imageUrl": "None", "price": 0.01, "limitCount": 20},
          {"id":'1', "name": "pizza", "imageUrl": "None", "price": 1.11, "limitCount": 20},
          {"id":'2', "name": "kebab", "imageUrl": "None", "price": 2.21, "limitCount": 20},
          {"id":'3', "name": "item3", "imageUrl": "None", "price": 3.31, "limitCount": 5},
          {"id":'4', "name": "item4", "imageUrl": "None", "price": 4.41, "limitCount": 5},
          {"id":'5', "name": "item5", "imageUrl": "None", "price": 5.51, "limitCount": 5},
          {"id":'6', "name": "item6", "imageUrl": "None", "price": 6.61, "limitCount": 2},
          {"id":'7', "name": "item7", "imageUrl": "None", "price": 7.71, "limitCount": 2},
          {"id":'8', "name": "item8", "imageUrl": "None", "price": 8.81, "limitCount": 2},
          {"id":'9', "name": "item9", "imageUrl": "None", "price": 9.91, "limitCount": 2},
          {"id":'10', "name": "item10", "imageUrl": "None", "price": 90.91, "limitCount": 2}
        ]);
        setFailed(true);
      }
      finally {
        setIsLoading(false)
      }
    })();
    }, [ref])

  return [items, isLoading, failed, ref, repeat];
}
