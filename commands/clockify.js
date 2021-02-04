const axios = require('axios');

const key = process.env.CLOCKTOKEN;
const url = `https://api.clockify.me/api/v1`;

module.exports = {
  name: 'clock',
  description: 'clock command',
  args: false,
  async execute(receivedMessage, arg){
    const userInfo = await axios.get(`${url}/user`, {
      headers: {
      'X-Api-Key': key
    }
    })
    console.log(`Welcome ${userInfo.data.name}`);
    console.log(`Your id: ${userInfo.data.id}`);
    // receivedMessage.channel.send(`Welcome ${userInfo.data.name}`);
    
    const workspaceInfo = await axios.get(`${url}/workspaces`, {
      headers: {
        'X-Api-Key': key
      }
    })
    console.log(`Workspace name: ${workspaceInfo.data[1].name}`);
    console.log(`Workspace ID: ${workspaceInfo.data[1].id}`);
    
    const allUsers = await axios.get(`${url}/workspaces/${workspaceInfo.data[1].id}/users`,{
      headers: {
        'X-Api-Key': key
      }
    })
    console.log(`Num: ${allUsers.data.length}`);

    const newTask = await axios.post(`${url}/workspaces/${workspaceInfo.data[1].id}/time-entries`,{
      headers: {
        'X-Api-Key': key,
        'content-type': 'application/json',
        'User-Agent': 'Mozilla',
        'Cookie': 'troute=t1',
      },
      body: {
        start: "2021-02-02T17:00:00.000Z",
        description: "teste vscode",
        end: "2021-02-02T18:00:00.000Z"
      }
    })

    console.log(newTask);
  },
}
