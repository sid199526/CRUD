import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})

export class AppComponent {


  cols: any[] =[]; // table 
  visible: boolean = false;
  value!: number; //category
    title = 'CRUD';
    productForm :any; //reactive form
    categoryData:any[] = ['Brand New' ,'Refurbished' ];
    tableData:any[]=[];
        
    
     constructor(private fb:FormBuilder) { 
   
      this.create_form()
     } 


     create_form(){
      this.productForm = this.fb.group({
        id:[Math.floor(Math.random() * 90 + 10),Validators.required],
        name : ['',Validators.required],
        value : ['',Validators.required],
        category : ['',Validators.required],
      }); 
     }
  

    ngOnInit(): void {
  
         } 

  


  onSubmit(){
    if(this.productForm.valid){
      let already_exist = this.tableData.filter((check:any) => check.id == this.productForm.value.id);
      if(already_exist.length){
        let index_of_value = this.tableData.findIndex((check:any) => check.id == this.productForm.value.id); 
        this.tableData[index_of_value] = this.productForm.value;
        this.create_form();
      }
      else{
        let already_exist = this.tableData.filter((check:any) => check.name == this.productForm.value.name);
        if(!already_exist.length){
          this.tableData.push(this.productForm.value);
          this.create_form();
        }
        else{
          this.create_form();
          alert("Product name already exist !")
        }
      }
    }
    else{
      this.create_form();
    }
    this.single = [];
    setTimeout(() => {
      this.single  = this.tableData;
    }, 300);
  }

  sort_table_by_price(){
    let value = this.tableData.sort((a:any,b:any) => b.value - a.value);
    this.tableData = [];
    this.tableData = value;
  }

  sort_table_by_name(){
    let value = this.tableData.sort((a:any,b:any) =>  a.name.localeCompare(b.name));
    this.tableData = [];
    this.tableData = value;
    
  }
  
  delete(index:any){
    this.tableData.splice(index,1);
  }

  edit(index:any){
    this.productForm.patchValue(this.tableData[index]);
  }




  single: any[] = [
  ];

  view: any[] = [500, 200];
  // options

  public showLegend = true;
  public gradient = true;
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  }; 
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;




  onSelect(event:any) {
    console.log(event);
  }
}
