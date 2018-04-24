import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UploaderService {
  constructor(
    private fs: AngularFirestore
  ) {

  }

  onUploadFile(image) {
    const productosRef = this.fs.app.storage().ref('productos');
    const childProductoRef = productosRef.child(this.fs.createId() + '.jpg');
    return childProductoRef.put(image)
      .catch(e => console.log('upload failed ', e));
  }

  // onUpdateFile(imageName: string, image) {
  //   const productosRef = this.fs.app.storage().ref('productos');
  //   const childProductoRef = productosRef.child(imageName + '.jpg');
  //   return childProductoRef.put(image)
  //     .catch(e => console.log('upload failed ', e));
  // }

}
