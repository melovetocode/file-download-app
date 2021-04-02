import { Component, OnInit } from '@angular/core';

export interface File {
  name: string;
  device: string;
  path: string;
  status: string;
}

const FILE_DATA = [
  {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
  {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
  {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
  {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
  {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  dataSource: File[] = FILE_DATA;
  fileSelectedCount = 0;
  showModal = false;
  showWarning = false;
  allChecked = false;
  selectedFileList = new Map();
  totalSelectableFiles = 0;
  messageContent = '';

  ngOnInit(): void {
    this.totalSelectableFiles = this.dataSource.filter(file => file.status === 'available').length;
  }

  selectAll(): void {
    this.allChecked = !this.allChecked;

    if (this.allChecked) {
      this.fileSelectedCount = this.totalSelectableFiles;
      this.dataSource.forEach((file, i)  => {
        if (file.status === 'available') {
          this.selectedFileList.set(i, {path: file.path, device: file.device});
        }
      });
    } else {
      this.fileSelectedCount = 0;
      this.selectedFileList.clear();
    }
  }

  selectFile(event, index): void {
    console.log(event.srcElement.checked);
    if (event.srcElement.checked) {
      this.selectedFileList.set(index,
        {path: this.dataSource[index].path, device: this.dataSource[index].device});
      this.fileSelectedCount++;
      const currentSelected = this.selectedFileList.size;
      this.allChecked = currentSelected === this.totalSelectableFiles ? true : false;
    } else {
      this.selectedFileList.delete(index);
      this.fileSelectedCount--;
      this.allChecked = false;
    }
  }

  checkSelection(index): boolean {
    if (this.selectedFileList.has(index)) {
      return true;
    } else {
      return false;
    }
  }

  downloadFiles(): void {
    if (this.selectedFileList.size > 0) {
      this.showModal = true;
      this.showWarning = false;
    } else {
      this.showWarning = true;
      setTimeout((() => this.showWarning = false), 5000);
    }
  }

  isIndeterminate(): boolean {
    const currentSelected = this.selectedFileList.size;
    return currentSelected > 0 && currentSelected < this.totalSelectableFiles ? true : false;
  }
}
