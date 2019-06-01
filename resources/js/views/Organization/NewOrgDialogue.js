import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import CustomInput from "-components/CustomInput/CustomInput.jsx";
import Button from "-components/CustomButtons/Button.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardBody from "-components/Card/CardBody.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};


class NewOrgDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    cancel = () => {
        this.props.actions.cancelNewOrg()
    };

    save = () => {
        // get input here
        this.props.actions.createOrg({...this.state});
    };

    onChange = (field) => (e) => {
        let changed = {};
        changed[field] = e.currentTarget.value;
        this.setState(changed);
    };

    render() {
        const {classes} = this.props;
        return (<GridContainer alignItems="center" justify={"center"}>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Create Organization</h4>
                        <p className={classes.cardCategoryWhite}>Complete the profile</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Name"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.state.name,
                                        onChange: this.onChange('name')
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Description"
                                    id="description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: this.state.description,
                                        onChange: this.onChange('description')
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.cancel}>Cancel</Button>
                        <Button disabled={!this.state.name.length || !this.state.description} onClick={this.save}
                                color="primary">Save</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>);
    }
}

export default withStyles(styles)(NewOrgDialogue);
