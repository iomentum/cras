<template>
  <table>
    <tr>
      <td
        class="titles"
        colspan="3"
      >
        Frais liés à l’exécution de la mission
      </td>
    </tr>
    <tr>
      <td>Date</td>
      <td>MISSIONS</td>
      <td>Montant</td>
    </tr>
    <tr>
      <td><input></td>
      <td><input></td>
      <td><input></td>
    </tr>
    <tr>
      <td><input></td>
      <td><input></td>
      <td><input></td>
    </tr>
    <tr>
      <td><input></td>
      <td><input></td>
      <td><input></td>
    </tr>
    <tr>
      <td><input></td>
      <td><input></td>
      <td><input></td>
    </tr>
    <tr>
      <td
        class="titles"
        colspan="3"
      >
        Commentaires :
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <textarea />
      </td>
    </tr>
  </table>
</template>

<style lang="scss">

table{
  margin:0 auto;
  margin-top: 20px;
  border-collapse: collapse;
  width: 50%;
  color:black;
  border: 1px solid black;
  text-align: center;
  font-family:"Bau-Bold";
  & tr{
    border: 1px solid black;
    height:30px;
    & td:nth-of-type(1), td:nth-of-type(3){
      width: 25%;
    }
  &:last-child{
    height: 80px
  }
  }
  & td{
    border: 1px solid black;

  }
  & .titles {
    background-color: $main-color;
    color: white;
  }
  & input {
    text-align: center;
  }
  & input, textarea {
      width: 100%;
      height:100%;
      border: none;
      background-color:rgba(0, 0, 0, 0);
      font-family:'bau-regular';
      font-size:20px;
      resize: vertical;
      &:focus{
        outline: none;
      }
    }
}


</style>