/**
 * Created by cvtt on 2017/4/25.
 */
export const Overallsituation = (industry,region)=>{
    let Overallsituation = new Object()
       if(industry ===undefined || region === undefined){
           return
       }
      if(industry  == null ){
          Overallsituation.region = region.region
      }else if(region == null){
          Overallsituation.industryId = industry.industryId
          Overallsituation.industryName = industry.industryName
      }

       return Overallsituation
}