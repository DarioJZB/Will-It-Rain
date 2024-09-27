import fs from 'fs';

class City {
  name: string;

  constructor(city: string){
    this.name = city;
  }
}

class HistoryService {
  //method that reads from the searchHistory.json file
  private async read() {
      const data = await fs.promises.readFile('history.json', 'utf8'); 
      return JSON.parse(data);
    }

  duplicateCheck (arr: City[], cityObj: City) {
    return arr.some(city => city.name === cityObj.name);
  }  

  async getCities() {
    const history = await this.read();
    return history;
   }
  
  async addCity(city: string) {
    let historyArr = await this.read();
    const tempCity = new City(city);
    if(!this.duplicateCheck(historyArr, tempCity)) {
      historyArr.push(tempCity);
      const formattedHistoryArr = JSON.stringify(historyArr);
      fs.writeFile('history.json', formattedHistoryArr, (error) =>{
        if(error) {
          console.log(error);
        } else {
          console.log(`successful`);
        }
      })
    }
  }
}

export default new HistoryService();
