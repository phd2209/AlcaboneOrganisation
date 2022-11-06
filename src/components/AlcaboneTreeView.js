/* eslint-disable no-use-before-define */
import React from 'react';
import { Grid, Typography, Paper, Box, Tooltip, IconButton, Stack }  from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux'
import html2canvas from 'html2canvas'
import ReactDOM from 'react-dom';
import Iconify from './Iconify'
//import AlcaboneStatistic  from './AlcaboneStatistic'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: /*theme.spacing(1)*/ "0.5rem",
    minWidth: "100%",
    width: "100%",    
    textAlign: "center",
    background: "black !important",
    color: "red !important",
    overflowX: "scroll",
    //boxShadow: `0px 2px 3px -1px rgba(255, 0, 0, 25),0px 5px 8px 1px rgba(255, 0, 0, 25),0px 1px 9px 2px rgba(255, 0, 0, 25)`,
    borderRadius: "8px",    
  },
  selectEmpty: {
      marginTop: /*theme.spacing(2)*/ "2rem",
  },
  green: {
      background: "green"
  },
  grid: {
    display: "flex",
    backgroundColor: "#000"
  },
  button: {
    margin: "0.5rem !important"
  },
  infoText: {
    color: "red",
    marginTop: "1rem !important"
  },
  orgChartUl: {
    padding: 0,
    display: "flex",
    listStyle: "none",
    paddingTop: "2.5vh",
    position: "relative",
    zIndex: 1000,
    /*justifyContent: "center",*/
    justifyContent: "space-between",
    '&::before': {
      content: "''",
      position: "absolute",
      top: "0vh",
      left: "50%",
      border: "solid 1px",
      height: "2.5vh",
      color: "#fff"
    },
    '&:first-child': {
      '&::before': {
        display: "none"
      }
    }
  },
  orgChartLi: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    background: "black !important",
    paddingTop: "2.5vh",
    zIndex: 1001,
    '&::before': {
      content: "''",
      top: 0,
      left: "50%",
      height: "2.5vh",
      position: "absolute",
      border: "solid 1px",
      color: "#fff"
    },
    '&::after': {
      content: "''",
      top: 0,
      width: "100%",
      position: "absolute",
      borderTop: "solid 1px",
      color: "#fff"
    },
    '&:only-child': {
        paddingTop: 0,
      '&::before': {
        display: "none"
      }
    },      
    '&:first-of-type': {
      '&::after': {
        width: "50%",
        right: 0
      }
    },
    '&:last-of-type': {
      '&::after': {
        width: "50%",
        left: 0
      }
    },
  },
  test: {
    padding: "0.3em",
    margin: "0.1em 1em",
    borderRadius: "2px",
    textAlign: "center",
    background: "#fff",
    maxWidth: "120px",
    width: "120px",
    minWidth: "120px"
  },
  thumb: {
    width: "110px",
    height: "120px"
  },
  poggersThumb: {
    width: "auto",
    height: "120px"
  },
  FamilyUl: {
    listStyleType: "none",
    textAlign: "center",
    padding: 0,
    display: "table",
    marginRight: "auto",
    marginLeft: "auto"
  },
  FamilyLi: {
    width: "25%",
    /*display: "inline-block",
    verticalAlign: "top",*/
    '&::before': {
      content: "attr(title)",
      display: "block"
    }    
  },
  treeView: {
    background: "black !important",
    width: "100%"
  }
}));

/* Test accounts:

0x75c1b704cdbb7c23f919ad233986d6c8e3f74b83 110
0x62a0b52e6a47b24df27653e36635a8f220d454fd 43
0xaf129b8b277c5348d64001aebdd07d118bd95515 6
0x719aB00d9c4546614008A35C8e69d4AC1698785E
https://phd2209.github.io/AlcaboneOrganisation/#?wallet=0x719aB00d9c4546614008A35C8e69d4AC1698785E
https://phd2209.github.io/AlcaboneOrganisation/
*/

function AlcaboneTreeView() {
  const classes = useStyles();

  const NFTs  = useSelector(state => state.NFTs)

  const { username } = NFTs[0].owner
  const godfather = NFTs[Math.floor(Math.random()*NFTs.length)];

  let JsonDataInit = {
    Parent: {
      token_id: godfather.token_id,
      img: godfather.image_thumbnail_url,
      age: "Godfather",
      children: []
    }
  }

  const generateFamilyStruncture = (item, family, level) => {

    if (level === 1) {
      let gangsta = { img: item.image_thumbnail_url, name: "", family: family, traits: item.traits, age: "Underboss" /*"Tribe leader"*/, children: []}
      JsonDataInit.Parent["children"].push(gangsta)
    }
    if ((1 < level) && (level <= 3)) {
      let gangsta1 = { img: item.image_thumbnail_url, name: "", family: family, traits: item.traits, age: "Capo" /*"Tribe hot head"*/, children: []}
      let underboss = JsonDataInit.Parent["children"].filter(item => item.family === family)      
      if (underboss.length > 0)
      {
        underboss[0].children.push(gangsta1)
      }
    }
    if ((3 < level) && (level <= 7)) {
      let gangsta2 = { img: item.image_thumbnail_url, name: "", family: family, traits: item.traits, age: "Soldier", children: []}
      let underboss = JsonDataInit.Parent["children"].filter(item => item.family === family)
      if (underboss.length > 0) {
        if (level === 4 || level === 5) {
          let capo = underboss[0].children[0]
          capo.children.push(gangsta2)
        }
        else {            
          let capo = underboss[0].children[1]            
          capo.children.push(gangsta2)
        }
      }
    }
    if ((7 < level) && (level <= 13)) {
      let gangsta3 = { img: item.image_thumbnail_url, name: "", family: family, traits: item.traits, age: "Prospect", children: []}
      let underboss = JsonDataInit.Parent["children"].filter(item => item.family === family)
      if (underboss.length > 0) {
        if (level === 8 || level === 9 || level === 10) {
          let capo = underboss[0].children[0]
          let soldier = capo.children[0]
          soldier.children.push(gangsta3)
        }
        else {            
          let capo = underboss[0].children[1]
          let soldier = capo.children[1]            
          soldier.children.push(gangsta3)
        }
      }      
    }
  }

  const generateJsonStructure = (data) => {

    let level_boneannos = 1 
    let level_napolebones = 1
    let level_colombones = 1
    let level_gambones = 1
    let level_corlebones = 1
    let level_rambones = 1
    let level_ck = 1

    data.map(item => {
      if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Boneannos').length > 0) {        
        generateFamilyStruncture(item, "Boneannos", level_boneannos)
        level_boneannos = level_boneannos + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Napolebones').length > 0) {
        generateFamilyStruncture(item, "Napolebones", level_napolebones)
        level_napolebones = level_napolebones + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Colombones').length > 0) {
        generateFamilyStruncture(item, "Colombones", level_colombones)
        level_colombones =  level_colombones + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Gambones').length > 0) {
        generateFamilyStruncture(item, "Gambones", level_gambones)
        level_gambones = level_gambones + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Corlebones').length > 0) {
        generateFamilyStruncture(item, "Corlebones", level_corlebones)
        level_corlebones = level_corlebones + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Rambones').length > 0) {
        generateFamilyStruncture(item, "Rambones", level_rambones)
        level_rambones = level_rambones + 1
      }
      else if (item.traits.filter(trait => trait.trait_type === 'Background' && trait.value === 'Contract Killers').length > 0) {
        generateFamilyStruncture(item, "Contract Killers", level_ck)
        level_ck = level_ck + 1
      }              
    })
    return JsonDataInit
  }

  const generateColor = (family) => {
    console.log(family)
    if (family === "Napolebones")
    {
      return "RGB(27, 112, 109)"
    }
    else if (family === "Boneannos") {
      return "RGB(201, 200, 198)"
    } 
    else if (family === "Colombones") {
      return "RGB(78, 63, 122)"
    }
    else if (family === "Corlebones") {
      return "RGB(75, 76, 78)"
    }
    else if (family === "Contract Killers") {
      return "RGB(59, 110, 163)"
    }    
    else if (family === "Gambones") {
      return "RGB(70, 60, 69)"
    }
    else if (family === "Rambones") {
      return "RGB(8, 91, 121)"
    }    
  }
 const gotoOpenSea = (token_id) => {
  if (token_id) {
  const url = "https://opensea.io/assets/ethereum/0x8ca5209d8cce34b0de91c2c4b4b14f20aff8ba23/" + token_id
  console.log(url)
  window.open(url, '_blank');
  }
 }  

  const generateHtmlStructure = (json) => {    
    let { Parent } =  json 
    
    return (
      <div 
        id="orgtree"
        className={classes.treeView}>
      <ul className={classes.orgChartUl}>
        
        <li key={Parent.token_id} className={classes.orgChartLi} id="orgtree_inner" onClick={() => gotoOpenSea(Parent.token_id)}>              
          <div className={classes.test}>
            <img className={classes.thumb} key={"don"+Parent.token_id} src={Parent.img} alt=""/>                
            <Typography sx={{fontSize: "10px", color: '#000', display:"block" }} variant="overline">{Parent.age}</Typography>
          </div>            
          
          <ul className={classes.orgChartUl}>     
          {Parent.children.map((boss, i) =>          
            {                 
            return (       
              
                <li key={boss.token_id} className={classes.orgChartLi} onClick={() => gotoOpenSea(boss.token_id)}>
                  <div key={boss.token_id + "header"} className={classes.test} style={{background: generateColor(boss.family) }}>
                  <Box>
                      <Typography sx={{fontSize: "10px", color: '#fff', display:"block", letterSpacing: "0px" }} variant="overline">{boss.family}</Typography>
                    </Box>
                  </div>
                  <div key={boss.token_id + "actual"} className={classes.test}>

                    <img className={classes.thumb} key={"underboss"+boss.token_id} src={boss.img} alt=""/>
                    <Typography sx={{fontSize: "10px", color: '#000', display:"block" }} variant="overline">{boss.age}</Typography>
                    
                  </div>
                  {boss.children && boss.children.length > 0 &&
                  <ul className={classes.orgChartUl}>
                  {boss.children.map((capo,j) => 
                  {
                    return (                                  
                      <li key={capo.token_id} className={classes.orgChartLi} onClick={() => gotoOpenSea(capo.token_id)}>                             
                      <div className={classes.test}>
                        <img className={classes.thumb} key={"capo"+capo.token_id} src={capo.img} alt=""/>                
                        <Typography sx={{fontSize: "10px", color: '#000', display:"block" }} variant="overline">{capo.age}</Typography>
                      </div>
                      {capo.children && capo.children.length > 0 && 
                        <ul className={classes.orgChartUl}>
                         {capo.children.map((soldier,j) => 
                          {
                            return (            
                              
                              <li key={soldier.token_id} className={classes.orgChartLi} onClick={() => gotoOpenSea(soldier.token_id)}>                             
                              <div className={classes.test}>
                                <img className={classes.thumb} key={"soldier"+soldier.token_id} src={soldier.img} alt=""/>                
                                <Typography sx={{fontSize: "10px", color: '#000', display:"block" }} variant="overline">{soldier.age}</Typography>
                              </div>
                              {soldier.children && soldier.children.length > 0 && 

                                <ul className={classes.orgChartUl}>
                              {soldier.children.map((prospect,k) => 
                                {
                                  return (            
                                    
                                    <li key={prospect.token_id} className={classes.orgChartLi} onClick={() => gotoOpenSea(prospect.token_id)}>                             
                                    <div className={classes.test}>
                                      <img className={classes.thumb} key={"prospect"+prospect.token_id} src={prospect.img} alt=""/>                
                                      <Typography sx={{fontSize: "10px", color: '#000', display:"block" }} variant="overline">{prospect.age}</Typography>
                                    </div>
                                    </li>  
                                  )
                                })}
                                </ul>
                              }
                              </li>                                          
                        )})}
                        </ul>
                      } 
                      </li>                                          
                )})}
                </ul>
              }
            </li>            
            )
        })}
        </ul>                
        </li>
      </ul>
      </div>
    )    
}

const saveAs = (uri, filename) => {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {

      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
  } else {
      window.open(uri);
  }
}

const downloadClicked = () => {

  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;

  const orgtree = document.getElementById("orgtree_inner");
  const element = ReactDOM.findDOMNode(orgtree);
  const filename = username + ".png"

  const newWidth = element.scrollWidth - element.clientWidth;
  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";
  if (element instanceof HTMLElement) {
    html2canvas(element,{
      useCORS: true,
    }).then(function (canvas) {
        saveAs(canvas.toDataURL(), filename);
    });
    }
    html.style.width = null;
    body.style.width = null;
}

  const NFTs_adjusted = NFTs.filter(token => token.token_id !== godfather.token_id)
  let json = generateJsonStructure(NFTs_adjusted)

  return (
    <Grid
      container
      spacing={2}
      sx={{mt: 2}}
      className={classes.grid}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          {/*<Grid item xs={12} sm={6} md={4} lg={3}>
            <AlcaboneStatistic  color='red' title="Owner" count={username} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AlcaboneStatistic color='red' title="Members" count={NFTs.length} />
          </Grid>
        <Typography sx={{fontWeight: 'fontWeightBold', color: 'red' }} variant="overline" gutterBottom>Report: {username}</Typography>
        */}
        <Tooltip title="Download Org chart">
            <IconButton color="error" onClick={() => downloadClicked()}>
                <Iconify icon="eva:download-fill" />
            </IconButton>
        </Tooltip>
      </Stack>
      <Paper className={classes.paper} elevation={3}>        
        {generateHtmlStructure(json)}
      </Paper>
    </Grid>
   
  );
}

export default AlcaboneTreeView