
import { LevelDB } from './leveldb'
import WriteStream from 'level-ws'
import ReadStream from  "level-ws"
import leveldown from 'leveldown'
import levelup from 'levelup'

//  import { ReadStream } from 'fs';

export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {
  private db: any 
  constructor(dbPath: string) {
    this.db = LevelDB.open(dbPath)
  }

  public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
    console.log("Saving data", metrics);
    const stream = WriteStream(this.db)
    stream.on('error', callback)
    stream.on('close', callback)
    metrics.forEach((m: Metric) => {
      stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
    })
    stream.end()
  }


  public getAll(callback: (error: Error | null, result?: Metric[]) => void) {
    var result = new Array();
    const rs = this.db.createReadStream()
      .on('data', function (data) {
        result.push(data)
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        console.log('Stream ended')
        callback(null, result);

      })
  }

  
  public delete(id: string, callback: (error: Error | null) => void) {
   
    const rs = this.db
      .del(id, (err: Error) => {
        if (err) { 
          console.log('Error finding')
          callback(err)
          return
         }
       console.log("Element deleted")
        callback(err)
      })
  }



  public get(id: string, callback: (error: Error | null, result?: Metric) => void) {
    var result = new Array()
    const rs = this.db
      .get(id, (err: Error, value: any) => {
        if (err) { 
          console.log('Error finding')
          callback(err)
          return
         }

        var crt_met = new Metric(id, value)
        

        console.log(crt_met)
        callback(null, crt_met)

      })
  }



}