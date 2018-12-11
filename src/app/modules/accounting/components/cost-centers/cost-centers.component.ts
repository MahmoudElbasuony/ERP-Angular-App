import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/LanguageService';
import { CostCenter } from '../../models/CostCenter';
import { LogService } from '../../../shared/services/LogService';
import { ConfirmationService } from 'primeng/primeng';
import { CostCenterRepository } from '../../Repos/CostCenterRepository';
import { LogLevel } from '../../../shared/models/User';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { fakeAsync } from '@angular/core/testing';
import { TreeNode } from 'primeng/primeng';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-cost-centers',
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.css'],
  providers: [CostCenterRepository ,ConfirmationService]
})
export class CostCentersComponent implements OnInit {

  newObject : CostCenter = new CostCenter();
  item :CostCenter = new CostCenter();
  CheckParent : boolean =false;
  list :any =[];  
  obj:any;
  files: TreeNode[]=[];
  selectedFile : TreeNode ;
  selectedCostCenter : CostCenter ;
  items: MenuItem[];
  TypesCenter : SelectItem[] = [];  
  editMode : boolean =false;
  data : CostCenter[] =[];  
 
  @ViewChild("CenterName")
  CenterName:AbstractControl;

  @ViewChild("Type")
  Tyoe:AbstractControl;

  constructor(private toaster: LogService,private langService:LanguageService ,  private confirmationService: ConfirmationService, private repo: CostCenterRepository ,private log : LogService ) { 

  this.repo.getAll().subscribe((res) => {
      debugger;
    if (res.length !=0) {
      debugger;
      this.obj =res[0];
      this.PutRoot(res[0])
      this.RestructTree(res[0],this.files[0]);
    }
    else
    {
      this.list=[];
    }
});


this.TypesCenter.push(
  {label: "" , value:""},
  {label: "Main" , value: "Main"},
  {label: "Sub" , value: "sub"}
);

}

  ngOnInit() {
    this.items = [
      {label: 'Edit', icon: 'fa-search', command: (event) => this.OnEditCostCenter(this.selectedCostCenter)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.onDeleteCostCenter(this.selectedCostCenter)}
  ];
}
PutRoot(obj)
{
  
  this.files = [
    {
        label: obj.AssociatedObject.CenterName,
        data:obj.AssociatedObject,
        expandedIcon: "fa-folder-open",
        collapsedIcon: "fa-folder",
        children: [],
      }]
}
     RestructTree(obj :any , objres :any )
      {
        debugger;
        this.list = [...this.list,obj.AssociatedObject];
        if(obj.Children.length ==0)
        {
          return;
        }

     
        for (var i =0; i< obj.Children.length ;i++) {
          objres.children.push( {
            label: obj.Children[i].AssociatedObject.CenterName,
            data:obj.Children[i].AssociatedObject,
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder",
            children: [],
          })
          this.RestructTree(obj.Children[i] ,objres.children[i]);
        }
      }

      checkHaveParent(obj :any , TargetObj :CostCenter )
      {
        debugger;

        if(obj.AssociatedObject ==TargetObj)
        {
          if(obj.Children.length !=0)
          {
           this.CheckParent = true;
          }
        }

        if(obj.Children.length ==0)
        {
          return;
        }
     
     
        for (var i =0; i< obj.Children.length ;i++) {
          this.checkHaveParent(obj.Children[i] ,TargetObj);
        }
      }
  Save() {
      debugger;
       this.newObject.Code = this.GeneratorCode();
    
       if((!this.selectedFile )&&(this.list != 0))
       {
        return this.log.pop(LogLevel.Error, "Must Select Cost Center From Tree");
       }
      
       if (!this.newObject.Code) {
         return this.log.pop(LogLevel.Error, "Code is required");
      }

       if (!this.newObject.CenterName) {
        return this.log.pop(LogLevel.Error, "Center Name is required");
      }
      if (!this.newObject.Type) {
        return this.log.pop(LogLevel.Error, "Type is required");
      }
    
     
    
      if(this.selectedFile)
      {
      this.newObject.parentId= this.selectedFile.data.Id;
      }
      this.repo.create(this.newObject).subscribe((data: any) => { 
        debugger;
       
        if(this.list.length == 0)
        {
         this.files = [
               {
                   label: this.newObject.CenterName,
                   data:data,
                   expandedIcon: "fa-folder-open",
                   collapsedIcon: "fa-folder",
                   children: [],
                 }]
           
        }
        if(this.selectedFile)
        {
          this.selectedFile.children.push({label:this.newObject.CenterName, data: data,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          children: [],
        });
       
        }
        if (!this.newObject.Id) // Add
        {
          this.list = [...this.list, data];
        }
      
      this.Reset(); 
      });
    }

    update(){
      this.repo.update(this.newObject).subscribe((data: any) => { 
          debugger;

      let costCenter: CostCenter = this.newObject;
      let costCenter_index = this.list.findIndex(g => g.Id === costCenter.Id);
      if (costCenter_index >= 0) {
     /// this.list.splice(costCenter_index, 1, costCenter);
      ///this.list = [...this.list,this.newObject];
      }
      this.repo.getAll().subscribe((res) => {
        this.list=[];
        debugger;
      if (res.length !=0) {
        debugger;
        this.obj =res[0];
        this.PutRoot(res[0])
        this.RestructTree(res[0],this.files[0]);
      }
      else
      {
        this.list=[];
      }
    });
        this.Reset(); 
        });
  }

    GeneratorCode() {
      var text = "";
      var possible = "0123456789";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
 Reset()
 {
   this.newObject = new CostCenter();
   this.CenterName.reset();
   this.Tyoe.reset();
   this.editMode =false;
 }
 nodeSelect(event)
 {
   debugger;
 /// event.data

 }

 OnEditCostCenter(costCenter:CostCenter) {
  this.newObject = this.clone(costCenter);
  this.editMode =true;
}

OnEditCostCenterTable(event) {
  debugger;
  this.newObject = this.clone(event.data);
  this.editMode =true;
}


onDeleteCostCenter(_costCenter: CostCenter) {
  debugger;


    this.checkHaveParent(this.obj,_costCenter)
 

  if(this.CheckParent == true)
  {
    this.CheckParent =false;
    return this.log.pop(LogLevel.Error, "Cost Center"+" "+_costCenter.CenterName+ "  "+" Have Childrens Node");
  
  }
  if(confirm("Do you want to delete this Cost Center")) {
    this.repo.delete(_costCenter.Id).subscribe((subsidiaryJournal) => {
              let costCenter_index = this.list.findIndex(c => c.Id === _costCenter.Id);
              if (costCenter_index >= 0)
                this.list.splice(costCenter_index, 1);
                this.list = [...this.list];
            ////  this.toaster.pop(LogLevel.Success, "subsidiary Journal Deleted Successfully");
            });
  }
  
  this.repo.getAll().subscribe((res) => {
    this.list=[];
    this.files=[];
    debugger;
  if (res.length !=0) {
    debugger;
    this.obj =res[0];
    this.PutRoot(res[0])
    this.RestructTree(res[0],this.files[0]);
  }
  else
  {
    this.list=[];
  }
});
}
// 

clone(c: CostCenter): CostCenter {
  let obj = new CostCenter();
  for (let prop in c) {
    obj[prop] = c[prop];
  }
  return obj;
}

}

