<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="adm.aspx.cs" Inherits="Photographer.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        Заказы:</div>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="OrderID" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display.">
            <Columns>
                <asp:BoundField DataField="OrderID" HeaderText="OrderID" ReadOnly="True" SortExpression="OrderID" />
                <asp:BoundField DataField="OrderDate" HeaderText="OrderDate" SortExpression="OrderDate" />
                <asp:BoundField DataField="Comment" HeaderText="Comment" SortExpression="Comment" />
                <asp:BoundField DataField="GalleryID" HeaderText="GalleryID" SortExpression="GalleryID" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:DB %>" DeleteCommand="DELETE FROM [Orders] WHERE [OrderID] = @OrderID" InsertCommand="INSERT INTO [Orders] ([OrderDate], [Comment], [GalleryID]) VALUES (@OrderDate, @Comment, @GalleryID)" ProviderName="<%$ ConnectionStrings:DB.ProviderName %>" SelectCommand="SELECT [OrderID], [OrderDate], [Comment], [GalleryID] FROM [Orders]" UpdateCommand="UPDATE [Orders] SET [OrderDate] = @OrderDate, [Comment] = @Comment, [GalleryID] = @GalleryID WHERE [OrderID] = @OrderID">
            <DeleteParameters>
                <asp:Parameter Name="OrderID" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="OrderDate" Type="DateTime" />
                <asp:Parameter Name="Comment" Type="String" />
                <asp:Parameter Name="GalleryID" Type="Int32" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="OrderDate" Type="DateTime" />
                <asp:Parameter Name="Comment" Type="String" />
                <asp:Parameter Name="GalleryID" Type="Int32" />
                <asp:Parameter Name="OrderID" Type="Int32" />
            </UpdateParameters>
        </asp:SqlDataSource>
        <br />
        <br />
        Сообщения:<asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" DataKeyNames="MessageID" DataSourceID="SqlDataSource2" EmptyDataText="There are no data records to display.">
            <Columns>
                <asp:BoundField DataField="MessageID" HeaderText="MessageID" ReadOnly="True" SortExpression="MessageID" />
                <asp:BoundField DataField="Name" HeaderText="Name" SortExpression="Name" />
                <asp:BoundField DataField="Email" HeaderText="Email" SortExpression="Email" />
                <asp:BoundField DataField="Text" HeaderText="Text" SortExpression="Text" />
                <asp:BoundField DataField="Date" HeaderText="Date" SortExpression="Date" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:DB %>" DeleteCommand="DELETE FROM [Messages] WHERE [MessageID] = @MessageID" InsertCommand="INSERT INTO [Messages] ([MessageID], [Name], [Email], [Text], [Date]) VALUES (@MessageID, @Name, @Email, @Text, @Date)" ProviderName="<%$ ConnectionStrings:DB.ProviderName %>" SelectCommand="SELECT [MessageID], [Name], [Email], [Text], [Date] FROM [Messages]" UpdateCommand="UPDATE [Messages] SET [Name] = @Name, [Email] = @Email, [Text] = @Text, [Date] = @Date WHERE [MessageID] = @MessageID">
            <DeleteParameters>
                <asp:Parameter Name="MessageID" Type="Object" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="MessageID" Type="Object" />
                <asp:Parameter Name="Name" Type="String" />
                <asp:Parameter Name="Email" Type="String" />
                <asp:Parameter Name="Text" Type="String" />
                <asp:Parameter Name="Date" Type="DateTime" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="Name" Type="String" />
                <asp:Parameter Name="Email" Type="String" />
                <asp:Parameter Name="Text" Type="String" />
                <asp:Parameter Name="Date" Type="DateTime" />
                <asp:Parameter Name="MessageID" Type="Object" />
            </UpdateParameters>
        </asp:SqlDataSource>
    </form>
</body>
</html>
