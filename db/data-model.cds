namespace my.bookshop;
using { managed } from '@sap/cds/common';


entity Books: managed{
  key ID : Integer;
  title  : String;
 // author : Association to Authors;
}
entity Authors {
 key ID : Integer;
 name   : String;
 //books  : Association to many Books on books.author = $self;
}