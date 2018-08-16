import axios from "axios";

describe("Api Test", () => {
  it("should return number of podcast", async () => {
    const response = await axios.post("http://127.0.0.1:3000/graphql", {
      query: `
      query {
        totalPodcast
      }
    `
    });
    const { data } = response;
    expect(data.data.totalPodcast).toBeGreaterThan(0)
  });
  it("should give podcasts with id name date", async () => {
    const response = await axios.post("http://127.0.0.1:3000/graphql", {
      query: `
      query {
        podcasts {
          id
          name
          date
        }
      }
    `
    });
    const { data } =response;
    expect(data.data.podcasts).toEqual(          
      expect.arrayContaining([      
        expect.objectContaining({   
          id: '43',
          name:
           '20 JavaScript Array and Object Methods to make you a better developer\n',
          date: '1524654511142\n' 
        })
      ])
    )
  })
  it("should give whith id: name text url", async () => {
    const response = await axios.post("http://127.0.0.1:3000/graphql", {
      query: `
      query {
        podcast(id: 50) {
          id
          name
          url
        }
      }
    `
    });
    const { data } =response;
    expect(data.data.podcast).toEqual(              
        expect.objectContaining({ id: '50',
        name: '050 - Progressive Web Apps.md',
        url: 'https://traffic.libsyn.com/syntax/Syntax050.mp3\n' })  
    )
  })
});
