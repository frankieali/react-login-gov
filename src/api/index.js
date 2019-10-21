/*=======================================================================*/
/* Fetch App Token */

async function fetchTokenLocal({uuid, id_token}) {
  console.log("data sent to server for fetchToken", 
    `\n\tuuid: ${uuid}`,
    `\n\tstate: ${id_token}`,
  )
  return ({
    "token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVzdCIsImlzcyI6Im1kYXMyIiwiZXhwIjoxNTYzOTk5MTk4LCJ1c2VybmFtZSI6IlRvbURpY2tBbmRIYXJyeSJ9.BglervXAFiPGDtMCptVAMrBFkmduxJ63635l_twhJMjurJFqKJS7G4WqU6SUerIP8RgQBatNo-pp-QO1QXZs80Cw0iDrwL9myc4H94v7ZjTWhKnVgaYkB4_bSEY6bwpd0qldnOiiAPYSWHDExaPFHvOSDp-BsYCMgVd0V4T_9w2uNBGAGux0r7fdSBSvgjyTgr0SzIgaSuD3EybpfcJwuxmI0VbSrSiQDrirpCGZb3EeI-EYcOXn6IoUxSDl9726yTD9cHdNz0IrHb5HViZJKt9tcGVDENeGGrn7yMHj2pnhhRbtFGVi-SBvgLEkYWd4c4B4Pflq26aBozS4txwjrg"
  })
}

async function fetchTokenProd({uuid, id_token}) {
  // fill in your PROD api details
  return await fetch(`/api/yourEndPoint?uuid=${uuid}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': id_token
    }
  })
  .then(resp => {
    if(resp.ok) {
      return resp.json()
    } else {
      throw new Error(`We were unable to fetch user data at this time. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

/*=======================================================================*/
/* Fetch User Data */

async function fetchUserLocal({uuid, token}) {
  console.log("data sent to server for fetchUser", 
    `\n\tuuid: ${uuid}`,
    `\n\ttoken: ${token}`,
  )
  return ({
    "userName": 'JohnSmith',
    "userFirstName": 'John',
    "userLastName": 'Smith',
    "roleName": 'author',
    "phoneNumber": 3459852395,
    "lastLogin": 1569948535000
  })
}

async function fetchUserProd({uuid, token}) {
  // fill in your PROD api details
  return await fetch(`/api/yourEndPoint/user?${uuid}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(resp => {
    if(resp.ok) {
      return resp.json()
    } else {
      throw new Error(`We were unable to fetch user data at this time. Please try again.`)
    }
  })
  .catch(error => {
    console.error(error)
    return error
  })
}

/*=======================================================================*/
/* Export API End Points for local and prod */

export const api = {
  local: {
    fetchToken: fetchTokenLocal,
    fetchUser: fetchUserLocal
  },
  prod: {
    fetchToken: fetchTokenProd,
    fetchUser: fetchUserProd
  }
}